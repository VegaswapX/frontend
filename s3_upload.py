"""
deploy react to aws-s3


#https://s3-ap-southeast-1.amazonaws.com/app.rapidtrade.io/index.html
#http://app.rapidtrade.io.s3-website.ap-southeast-1.amazonaws.com/
curl --head http://app.rapidtrade.io/static/js/3.33e86af0.chunk.js
"""

import logging
import boto3
from botocore.exceptions import ClientError
import os
import sys
import boto3

rt_bucket = "rapidtrade.io"
app_bucket = "app.rapidtrade.io"
region = 'ap-southeast-1'
# s3_client = boto3.client('s3') #,region_name = region)
# print(s3_client.region_name)


def upload_file(file_name, bucket, object_name):
    """
    :param file_name: File to upload
    :param bucket: Bucket to upload to
    :param object_name: S3 object name. If not specified then file_name is used
    :return: True if file was uploaded, else False
    """
    try:
        print("upload_file: filename, bucketname, object\n ",
              file_name, bucket, object_name)
        eargs = {'ACL': 'public-read'}
        eargs['ContentType'] = 'application/javascript'
        print(eargs)

        response = s3_client.upload_file(
            file_name, bucket, object_name, ExtraArgs=eargs)
        if response == None:
            print("ok")
        #s3.meta.client.upload_file('/tmp/hello.txt', 'mybucket', 'hello.txt')
        else:
            print("response ", response)
    except ClientError as e:
        print("error ",e)

def list_files(bucket):
    print("*** list s3 files *** \n\n")
    s3 = boto3.resource('s3')
    for key in s3_client.list_objects(Bucket=bucket)['Contents']:
        #print(key['Key'])
        print(key)
        s3_object_key = key['Key']
        o = s3.Object(bucket, s3_object_key)
        #print (o.last_modified,o.content_encoding)
        print (o)

def create_bucket(s3_client, bucket_name, region=None):
    try:
        if region is None:
            s3_client = boto3.client('s3')
            s3_client.create_bucket(Bucket=bucket_name)
        # else:
        #     s3_client = boto3.client('s3', region_name=region)
        #     location = {'LocationConstraint': region}
        #     s3_client.create_bucket(Bucket=bucket_name,
        #                             CreateBucketConfiguration=location)
    except ClientError as e:
        logging.error(e)
        return False
    return True


if __name__=='__main__':
    #upload_index(rt_bucket)
    wdir = os.path.join(os.getcwd(),".")
    # s3 = boto3.client("s3", region_name=region)
    # s3 = boto3.client("s3")

    s3 = boto3.resource('s3')
    print(s3)
    # s3.create_bucket(Bucket='vegaapp')

    s3.create_bucket(Bucket='vegaapp', CreateBucketConfiguration={
    'LocationConstraint': region})
    # bucket_name = 'vegaapp'
    # create_bucket(s3, bucket_name)
    #upload_file('daily.csv',bucket,'daily.csv')
    #upload_file('0x75e5852385fa856791d703e3f04da24f5bc13975.csv',bucket, '0x75e58')
    # list_files(bucket_name)
    # upload_file('daily.json',bucket,'daily.json')

    