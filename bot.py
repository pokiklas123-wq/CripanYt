from flask import Flask, jsonify, request
import yt_dlp
import random
import requests
from urllib.parse import quote

app = Flask(__name__)

# إعدادات متقدمة لتجنب الحظر
def get_ytdl_options():
    user_agents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/91.0.4472.124 Safari/537.36',
        'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15'
    ]
    
    return {
        'quiet': True,
        'no_warnings': True,
        'extract_flat': False,
        'force_ipv4': True,
        'socket_timeout': 30,
        'extractor_args': {
            'youtube': {
                'player_client': ['android', 'ios', 'web'],
                'player_skip': ['configs', 'webpage', 'js']
            }
        },
        'http_headers': {
            'User-Agent': random.choice(user_agents),
            'Accept': '*/*',
            'Accept-Language': 'en-US,en;q=0.5',
            'Referer': 'https://www.youtube.com/',
            'Origin': 'https://www.youtube.com'
        }
    }

@app.route('/get_links', methods=['GET'])
def get_links():
    url = request.args.get('url')
    
    if not url:
        return jsonify({'error': 'أرسل رابط اليوتيوب'})
    
    try:
        # محاولة yt-dlp أولاً
        ydl_opts = get_ytdl_options()
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            
            result = {
                'title': info.get('title', ''),
                'duration': info.get('duration', 0),
                'links': []
            }
            
            for f in info['formats'][:10]:  # أول 10 تنسيقات فقط
                if f.get('url'):
                    result['links'].append({
                        'url': f['url'],
                        'quality': f.get('format_note', 'unknown'),
                        'type': 'audio' if f.get('vcodec') == 'none' else 'video'
                    })
            
            return jsonify(result)
            
    except Exception as e:
        # إذا فشل yt-dlp، استخدم fallback API
        return jsonify({'error': 'يوتيوب تمنع السيرفرات السحابية', 'solution': 'استخدم التطبيق مع Termux'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)
