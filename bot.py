from flask import Flask, jsonify, request
import yt_dlp
import random
import requests
import re
import time

app = Flask(__name__)

# إعدادات متقدمة لتجاوز الحظر
def get_advanced_ydl_opts():
    user_agents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/119.0',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    ]
    
    return {
        'quiet': False,
        'no_warnings': False,
        'extract_flat': False,
        'force_ipv4': True,
        'socket_timeout': 60,
        'extractor_retries': 3,
        'retries': 5,
        'fragment_retries': 5,
        'skip_unavailable_fragments': True,
        'extractor_args': {
            'youtube': {
                'player_client': ['android', 'ios', 'web', 'tv_embedded', 'mweb'],
                'player_skip': ['configs', 'webpage'],
                'throttled_rate': '100000000'
            }
        },
        'http_headers': {
            'User-Agent': random.choice(user_agents),
            'Accept': '*/*',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Referer': 'https://www.youtube.com/',
            'Origin': 'https://www.youtube.com',
            'DNT': '1',
            'Connection': 'keep-alive',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site',
        }
    }

@app.route('/')
def home():
    return "⚡ البوت شغال بقوة! استخدم /get_links?url=رابط_اليوتيوب"

@app.route('/get_links', methods=['GET'])
def get_links():
    url = request.args.get('url')
    
    if not url:
        return jsonify({'error': 'أرسل رابط اليوتيوب'})
    
    try:
        # تنظيف الرابط
        clean_url = url.split('&')[0].split('?')[0]
        
        # محاولة yt-dlp بقوة
        ydl_opts = get_advanced_ydl_opts()
        
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(clean_url, download=False)
            
            result = {
                'title': info.get('title', ''),
                'duration': info.get('duration', 0),
                'thumbnail': info.get('thumbnail', ''),
                'real_links': [],
                'download_count': 0,
                'view_count': info.get('view_count', 0)
            }
            
            # جمع أفضل الرواقع
            video_links = []
            audio_links = []
            
            for f in info['formats']:
                if f.get('url') and not f.get('format_note', '').startswith('storyboard'):
                    link_info = {
                        'url': f['url'],
                        'quality': f.get('format_note', 'unknown'),
                        'type': 'audio' if f.get('vcodec') == 'none' else 'video',
                        'extension': f.get('ext', 'unknown'),
                        'filesize': f.get('filesize', 0),
                        'bitrate': f.get('abr', f.get('tbr', 0))
                    }
                    
                    # تصنيف الرواقع
                    if link_info['type'] == 'video':
                        video_links.append(link_info)
                    else:
                        audio_links.append(link_info)
            
            # ترتيب الفيديو من الأفضل للأقل
            video_links.sort(key=lambda x: (
                1 if '1080' in str(x['quality']) else
                2 if '720' in str(x['quality']) else
                3 if '480' in str(x['quality']) else
                4 if '360' in str(x['quality']) else 5
            ))
            
            # ترتيب الصوت من الأفضل للأقل
            audio_links.sort(key=lambda x: x.get('bitrate', 0), reverse=True)
            
            # إضافة أفضل 3 فيديو وأفضل 2 صوت
            result['real_links'].extend(video_links[:3])
            result['real_links'].extend(audio_links[:2])
            
            return jsonify(result)
            
    except yt_dlp.utils.DownloadError as e:
        # إذا حظر يوتيوب، نستخدم طرق بديلة
        return jsonify({
            'error': 'يوتيوب حظرت السيرفر',
            'solution': 'جرب هذه الطرق:',
            'methods': [
                '1. استخدم yt-dlp محلياً في Termux',
                '2. استخدم VPN مع السيرفر',
                '3. غير منصة الاستضافة',
                '4. استخدم مواقع تحميل مباشرة'
            ],
            'working_sites': get_backup_sites(url)
        })
    
    except Exception as e:
        return jsonify({
            'error': f'خطأ: {str(e)}',
            'retry_suggestion': 'جرب الرابط مرة أخرى بعد قليل'
        })

def get_backup_sites(youtube_url):
    """رواقع بديلة للتحميل"""
    video_match = re.search(r'(?:youtube\.com/watch\?v=|youtu\.be/)([^&?\s]+)', youtube_url)
    if video_match:
        video_id = video_match.group(1)
        return [
            f"https://yt5s.com/en32?q=https://youtube.com/watch?v={video_id}",
            f"https://en.y2mate.guru/youtube/{video_id}",
            f"https://ssyoutube.com/watch?v={video_id}",
            f"https://loadmp4.com/en/?v={video_id}"
        ]
    return []

@app.route('/direct_download', methods=['GET'])
def direct_download():
    """محاولة تحميل مباشر (قد يعمل أحياناً)"""
    url = request.args.get('url')
    
    try:
        ydl_opts = {
            'format': 'best[height<=720]',
            'outtmpl': '%(title)s.%(ext)s',
        }
        
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            return jsonify({
                'status': 'success',
                'title': info['title'],
                'selected_format': ydl_opts['format'],
                'note': 'يمكن استخدام هذا الرابط للتحميل المباشر'
            })
            
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
