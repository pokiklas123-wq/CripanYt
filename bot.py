from flask import Flask, jsonify, request
import yt_dlp
import os

app = Flask(__name__)

@app.route('/')
def home():
    return "✅ البوت شغال على Railway!"

@app.route('/get_links', methods=['GET'])
def get_links():
    try:
        url = request.args.get('url')
        if not url:
            return jsonify({'error': 'أرسل رابط اليوتيوب'})
        
        ydl_opts = {
            'quiet': True,
            'no_warnings': True,
        }
        
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            
            result = {
                'title': info.get('title', ''),
                'duration': info.get('duration', 0),
                'links': []
            }
            
            for f in info['formats'][:10]:
                if f.get('url'):
                    result['links'].append({
                        'url': f['url'],
                        'quality': f.get('format_note', 'unknown'),
                        'type': 'audio' if f.get('vcodec') == 'none' else 'video'
                    })
            
            return jsonify(result)
            
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
