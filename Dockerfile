FROM alpine:latest
# انسخ ملفي الخادم من جذر المستودع
COPY my_ge_server.x86_64 /app/my_ge_server
COPY my_ge_server.pck /app/my_ge_server.pck
RUN chmod +x /app/my_ge_server
EXPOSE 9999
CMD ["/app/my_ge_server"]
