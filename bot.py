from flask import Flask, jsonify, request
import yt_dlp
import random

app = Flask(__name__)

@app.route('/')
def home():
    return "✅ البوت شغال على Railway! استخدم /get_links?url=رابط_اليوتيوب"

@app.route('/get_links', methods=['GET'])
def get_links():
    url = request.args.get('url')
    
    if not url:
        return jsonify({'error': 'أرسل رابط اليوتيوب'})
    
    try:
        ydl_opts = {
            'quiet': True,
            'no_warnings': True,
            'extract_flat': False,
            'socket_timeout': 30,
            'http_headers': {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': '*/*',
                'Accept-Language': 'en-US,en;q=0.5'
            }
        }
        
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            
            result = {
                'title': info.get('title', ''),
                'duration': info.get('duration', 0),
                'links': []
            }
            
            for f in info['formats'][:15]:  # أول 15 تنسيق فقط
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
    app.run(host='0.0.0.0', port=5000, debug=False)
