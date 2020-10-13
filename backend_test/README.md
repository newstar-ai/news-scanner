## Intall Dependencies
```
pip3 install -r requirement.txt
```

## Migrate data 
```
python manage.py migrate 
# or you could try this if there is any error
python manage.py migrate --run-syncdb

python manage.py makemigrations

```

## Delete all and Recreate index
```
./manage.py search_index --rebuild
```

## The file sqlite3 contain all the data, elasticsearch data: 3.129.57.131:5601