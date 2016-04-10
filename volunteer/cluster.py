#! /usr/bin/env python

# use the regex module
import re
import requests
import json
import numpy as np
import pandas as pd
from sklearn.cluster import DBSCAN
from scipy.spatial import distance

def parseGPX():
    # read in the file
    in_file = open('latLong.gpx').read()
    # or use string as input
    # Find matches using regex
    #matches = re.findall('<trkpt lat="([-0-9\.]+)" lon="([-0-9\.]+)"/>', in_file)
    matches = re.findall('<wpt lat="([-0-9\.]+)" lon="([-0-9\.]+)">', in_file)

    # make new file lines by combining lat and lon from matches
    out_lines = [lon + ',' + lat for lat, lon in matches]

    # convert array of strings to single string
    out_lines = '\n'.join(out_lines)

    print out_lines
    # output to new file
    open('dest.txt', 'w').write(out_lines)

def get_cord_matt():
    #magical code to hit the endpoint
    '''
    r = requests.get('https://magicalmatt.com/')
    response = r.json()
    '''
    response = json.loads("""[{
        "id": "_1",
            "reporter": "Morty",
                "description": "Dead Rick",
                    "timeReported": "2016.04.09.13.23.47",
                        "latitude": "90.0",
                            "longitude": "45.5",
                                "timeCompleted": null
                                }, {
                                    "id": "_2",
                                        "reporter": "Rick",
                                            "description": "High Morty",
                                                "timeReported": "2016.04.09.13.23.48",
                                                    "latitude": "120.23",
                                                        "longitude": "35.95",
                                                            "timeCompleted": "right-about-now"
                                                            }, {
                                                                "id": "_3",
                                                                    "reporter": "Blue",
                                                                        "description": "Skadoo",
                                                                            "timeReported": "2016.04.09.13.23.48",
                                                                                "latitude": "129.32",
                                                                                    "longitude": "32.33",
                                                                                        "timeCompleted": null
                                                                                        }]""")
    
    return response

def cluster_coords(response):
    #create dataframe
    df = pd.DataFrame(columns=['lat','long','cleaned'])
    coordsC = [(0.0,0.0)]
    coordsP = [(0.0,0.0)]
    for a in response:
        lat = a['latitude']
        longi = a['longitude']
        if a['timeCompleted'] is None:
            cleaned = False
            coordsP.append([lat,longi])
        else:
            cleaned = True
            coordsC.append([lat,longi])
        #df.append(pd.Series([lat,longi,cleaned],index=['lat','long','cleaned']),ignore_index=True)
        #df.append(pd.Series(['a','b','c'],index=['lat','long','cleaned']),ignore_index=True)
        df = df.append({'lat':lat,'long':longi,'cleaned':cleaned}, ignore_index=True)
    
    distance_matrix = distance.squareform(distance.pdist(coordsC))
    db = DBSCAN(eps=0.03).fit(distance_matrix)
    #print(db.labels_)
    for k in set(db.labels_):
        class_members = [index[0] for index in np.argwhere(db.labels_ == k)]
        for index in class_members:
            print '%s,%s' % (int(k), '{0},{1}'.format(*coordsC[index]))
    '''
    # Compute DBSCAN
    db = DBSCAN(eps=0.3, min_samples=10).fit(X)
    core_samples_mask = np.zeros_like(db.labels_, dtype=bool)
    core_samples_mask[db.core_sample_indices_] = True
    labels = db.labels_

    # Number of clusters in labels, ignoring noise if present.
    n_clusters_ = len(set(labels)) - (1 if -1 in labels else 0)

    print(df)
    '''
    
a = get_cord_matt()
cluster_coords(a)
