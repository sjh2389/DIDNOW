url=192.168.123.109
echo "upstream client {" >> temp
echo \ "    server $url:3010;" >> temp
echo "}" >> temp

echo "upstream auth-server {" >> temp
echo \ "    least_conn;" >> temp
echo \ "    server $url:9000;" >> temp
echo \ "    server $url:9001;" >> temp
echo "}" >> temp

echo "upstream issuer-server {" >> temp
echo \ "    least_conn;" >> temp
echo \ "    server $url:9100;" >> temp
echo \ "    server $url:9101;" >> temp
echo "}" >> temp

echo "upstream holder-server {" >> temp
echo \ "    least_conn;" >> temp
echo \ "   server $url:9200;" >> temp
echo \ "   server $url:9201;" >> temp
echo "}">> temp

echo "upstream verifier-server {" >> temp
echo \ "    least_conn;" >> temp
echo \ "    server $url:9300;" >> temp
echo \ "    server $url:9301;" >> temp
echo "}" >> temp

cat temp | cat - default.example > default.conf
rm temp