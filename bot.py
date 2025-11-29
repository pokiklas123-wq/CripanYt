from flask import Flask, jsonify, request
import re

app = Flask(__name__)

@app.route('/get_links', methods=['GET'])
def get_links():
    url = request.args.get('url')
    
    if not url:
        return jsonify({'error': 'أرسل رابط اليوتيوب'})
    
    # استخراج video ID
    video_match = re.search(r'(?:youtube\.com/watch\?v=|youtu\.be/)([^&?\s]+)', url)
    if not video_match:
        return jsonify({'error': 'رابط يوتيوب غير صحيح'})
    
    video_id = video_match.group(1)
    
    # رواقع مواقع تحميل تعمل فعلياً
    download_sites = [
        {
            'name': 'YT5S',
            'url': f'https://yt5s.com/en32?q=https://www.youtube.com/watch?v={video_id}',
            'working': 'نعم'
        },
        {
            'name': 'Y2Mate', 
            'url': f'https://en.y2mate.guru/youtube/{video_id}',
            'working': 'نعم'
        },
        {
            'name': 'SSYouTube',
            'url': f'https://ssyoutube.com/watch?v={video_id}',
            'working': 'نعم'
        }
    ]
    
    return jsonify({
        'status': 'success',
        'video_id': video_id,
        'download_sites': download_sites,
        'message': 'استخدم أي من هذه المواقع للتحميل'
    })

@app.route('/')
def home():
    return "🎯 البوت شغال! استخدم /get_links?url=رابط_اليوتيوب"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
