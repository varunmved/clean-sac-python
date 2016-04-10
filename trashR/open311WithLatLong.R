library(RDSTK)

data311 <- read.csv("~/Documents/CodeForSac/trashR/311data.csv")

open <- data311 %>% filter(STATUS == "Open")

open.noIntersects <- open[-which(grepl("INTERSECTION",open$LOCATION)),]

open.noIntersects <- mutate(open.noIntersects, ADDRESS = paste(LOCATION,ZIPCODE,sep=", "))


#dont run this line or my son ever again
#geoDudes=lapply(open.noIntersects$address,street2coordinates)
geoDudes = geoDudes[-c(1080,652,560)]
open.noIntersects = open.noIntersects[-c(1080,652,560),]
latitude = NULL
longitude = NULL
j = NULL
for(i in 1:length(geoDudes)){ #472
  latitude[i] = geoDudes[[i]]$latitude
  longitude[i] = geoDudes[[i]]$longitude
}

open.noIntersects$LAT = latitude
open.noIntersects$LON = longitude

write.csv(open.noIntersects, file = "openlatLong.csv")

