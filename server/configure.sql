ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'CS178!CD!dc';
FLUSH PRIVILEGES;
set global net_buffer_length=1000000;
set global max_allowed_packet=1000000000;
