options(geonamesUsername = "semperstew")
library(geonames)
library(sp)

#crime <- read.csv("~/Documents/Practice Programming/R Projects/Sac County Crime Maps/Crime Logs Fixed.csv", stringsAsFactors=FALSE)
gpx <- read.csv("gpx.csv")

clusts = kmeans(x = gpx[,c(1,2)], centers = 4)

clusts$cluster[which(clusts$cluster == 3)] = 2
clusts$cluster[which(clusts$cluster == 4)] = 3
gpx$clust = clusts$cluster
clusts$centers
# grab google map
map_coords <- geocode('arden arcade, california')

myMap <- get_map(location = map_coords, zoom = 11, maptype = 'terrain')
bb <- attributes(myMap)$bb
lat_range <- range(c(bb$ll.lat, bb$ur.lat))
lon_range <- range(c(bb$ll.lon, bb$ur.lon))

# contour plot
SacMap <- ggmap(myMap, extent = 'device')

SacMap + geom_point(aes(x = lon, y = lat), data=gpx)# + facet_wrap(~clust, ncol = 1)


overlay <- stat_density2d(
  aes(x = lon, y = lat, fill = ..level..,alpha = ..level..),
  size = 2, bins = 12, data = gpx,
  geom = "polygon"
) 

SacMap + overlay + scale_fill_gradientn(colors = rev(heat.colors(256))) +
  theme(legend.position = 'left') +
  guides(alpha = FALSE) +
  facet_wrap(~clust, ncol = 2)

