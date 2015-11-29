//
//  DocPicker.m
//  Grouplus
//
//  Created by krxsky on 2015-11-27.
//  Copyright © 2015 Facebook. All rights reserved.
//

#import "DocManager.h"
@import UIKit;
#import <AssetsLibrary/AssetsLibrary.h>
#import <MobileCoreServices/MobileCoreServices.h>

@implementation DocManager


RCT_EXPORT_MODULE()

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

RCT_EXPORT_METHOD(pickDoc:(RCTResponseSenderBlock)cb)
{
  callback = cb;
  UIDocumentMenuViewController *importMenu =
  [[UIDocumentMenuViewController alloc] initWithDocumentTypes:[NSArray arrayWithObjects: @"public.data", nil]
                                                       inMode:UIDocumentPickerModeImport];
  importMenu.delegate = self;
  UIViewController *root = [[[[UIApplication sharedApplication] delegate] window] rootViewController];
  [root presentViewController:importMenu animated:YES completion:nil];
}

-(void)documentMenu:(UIDocumentMenuViewController *)documentMenu
didPickDocumentPicker:(UIDocumentPickerViewController *)documentPicker
{
  UIViewController *root = [[[[UIApplication sharedApplication] delegate] window] rootViewController];
  documentPicker.delegate = self;
  [root presentViewController:documentPicker animated:YES completion:nil];
}

- (void)documentPicker:(UIDocumentPickerViewController *)controller
didPickDocumentAtURL:(NSURL *)url
{
  NSData *data = [NSData dataWithContentsOfURL:url];
  NSString *data1 = [data base64EncodedStringWithOptions:NSDataBase64EncodingEndLineWithLineFeed];
  callback(@[[url lastPathComponent], data1]);
}

- (NSString *)generateBoundaryString
{
  NSString *uuid = [[NSUUID UUID] UUIDString];
  return [NSString stringWithFormat:@"----%@", uuid];
}

@end