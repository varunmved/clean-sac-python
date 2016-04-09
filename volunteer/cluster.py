#! /usr/bin/env python

# use the regex module
import re

def parseGPX():
    # read in the file
    in_file = open('latLong.gpx').read()
    # or use string as input
    '''
    in_file = """
         <trk>
            <trkseg>
                <trkpt lat="38.8577288" lon="-9.0997973"/>
                <trkpt lat="38.8576367" lon="-9.1000557"/>
                <trkpt lat="38.8575259" lon="-9.1006374"/>
            </trkseg>
        </trk>
    """
    '''
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

def cluster_from_file():
    in_file = open('dest.txt').read()

