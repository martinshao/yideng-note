MySQL--启动和关闭MySQL服务
1.Windows下

启动服务
mysqld --console
或　　net start mysql
关闭服务
mysqladmin -uroot shudown
或 net stop mysql

2.Linux下

启动服务
service mysql start
关闭服务
service mysql stop
重启服务
service restart stop