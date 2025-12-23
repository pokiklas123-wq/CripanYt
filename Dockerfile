# استخدام صورة Owncast الرسمية
FROM owncast/owncast:latest

# يتم الآن استخدام المنفذ الديناميكي ($PORT) من Railway، لذا يمكن إزالة سطر EXPOSE أو تركه دون تأثير
# EXPOSE 8080 1935

# أمر التشغيل مع المنفذ المحدد من Railway
CMD owncast --webserverport=$PORT
