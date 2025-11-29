from flask import Flask, jsonify, request
import yt_dlp

app = Flask(__name__)

@app.route('/')
def home():
    return "البوت شغال! استخدم /get_links?url=رابط_اليوتيوب"

@app.route('/get_links', methods=['GET'])
def get_links():
    url = request.args.get('url')
    
    if not url:
        return jsonify({'error': 'أرسل رابط اليوتيوب'})
    
    try:
        ydl_opts = {'quiet': True}
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            
            result = {
                'title': info.get('title', ''),
                'duration': info.get('duration', 0),
                'links': []
            }
            
            for f in info['formats']:
                result['links'].append({
                    'url': f['url'],
                    'quality': f.get('format_note', ''),
                    'type': 'audio' if f.get('vcodec') == 'none' else 'video'
                })
            
            return jsonify(result)
            
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)
