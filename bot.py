from flask import Flask, jsonify, request
import requests
import re
import json

app = Flask(__name__)

def get_video_info_alternative(video_id):
    """استخدام APIs بديلة"""
    apis = [
        f"https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v={video_id}&format=json",
        f"https://noembed.com/embed?url=https://www.youtube.com/watch?v={video_id}",
    ]
    
    for api_url in apis:
        try:
            response = requests.get(api_url, timeout=10)
            if response.status_code == 200:
                return response.json()
        except:
            continue
    return None

@app.route('/')
def home():
    return "🎯 YouTube Info Bot - استخدم /get_links?url=رابط_اليوتيوب"

@app.route('/get_links', methods=['GET'])
def get_links():
    url = request.args.get('url')
    
    if not url:
        return jsonify({'error': 'أرسل رابط اليوتيوب'})
    
    try:
        # استخراج video ID
        video_match = re.search(r'(?:youtube\.com/watch\?v=|youtu\.be/)([^&?\s]+)', url)
        if not video_match:
            return jsonify({'error': 'رابط يوتيوب غير صحيح'})
        
        video_id = video_match.group(1)
        
        # محاولة الحصول على المعلومات الأساسية
        video_info = get_video_info_alternative(video_id)
        
        if video_info:
            result = {
                'title': video_info.get('title', 'Unknown'),
                'author': video_info.get('author_name', 'Unknown'),
                'thumbnail': video_info.get('thumbnail_url', ''),
                'video_id': video_id,
                'direct_urls': {
                    'youtube': f'https://www.youtube.com/watch?v={video_id}',
                    'youtu_be': f'https://youtu.be/{video_id}'
                },
                'download_suggestions': [
                    'استخدم تطبيقات التحميل المتخصصة:',
                    '- yt-dlp (في Termux)',
                    '- مواقع like y2mate, yt5s',
                    '- تطبيقات Android المتخصصة'
                ]
            }
        else:
            result = {
                'video_id': video_id,
                'direct_urls': {
                    'youtube': f'https://www.youtube.com/watch?v={video_id}',
                    'youtu_be': f'https://youtu.be/{video_id}'
                },
                'note': 'لم أستطع جلب معلومات الفيديو',
                'solution': 'يوتيوب تمنع السيرفرات السحابية. استخدم التطبيق مع Termux محلياً'
            }
        
        return jsonify(result)
        
    except Exception as e:
        return jsonify({'error': f'خطأ: {str(e)}'})

@app.route('/health')
def health():
    return jsonify({'status': 'active', 'message': 'البوت شغال'})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
