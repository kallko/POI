# create POI
# http://localhost:10010/create
# POST:
# {
#  	"name": "first1",
#  	"lat": 22,
#  	"lon": 25,
#  	"categories": ["cafe","sport"],
#  	"address": "Katze strasse 24"
#  }
#
#
# modify POI (must be valid name + lat/lon)
# POST:
# http://localhost:10010/modify
# {
#  	"oldName": "first1",
#  	"oldLat": 22,
#  	"oldLon": 25,
#  	"name": "newFirst",
#  	"lat": 23,
#  	"lon": 24,
#  	"address": "Hund strasse 12",
#  	"categories": ["cafe", "gym"]
#  }
#
# search POI in box
# GET:
# http://localhost:10010/searchinbox?lat1=20&lon1=12&lat2=23&lon1=12&lon2=25
# 
# search POI by categories
# POI must have all specified categories
# POST:
# http://localhost:10010/searchbycategories
# {
#  	"categories": ["cafe", "gym"]
#  }
#
# search POI by name 
# POST:
# http://localhost:10010/serchbyname?POIName=fifth
#
#
#

