//
//  DocPicker.m
//  Grouplus
//
//  Created by krxsky on 2015-11-27.
//  Copyright © 2015 Facebook. All rights reserved.
//

#import "DocManager.h"
@import UIKit;
@implementation DocManager

RCT_EXPORT_MODULE()

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

RCT_EXPORT_METHOD(pickDoc:(RCTResponseSenderBlock)callback)
{
  UIDocumentMenuViewController *importMenu =
  [[UIDocumentMenuViewController alloc] initWithDocumentTypes:[NSArray arrayWithObjects: @"public.data", nil]
                                                       inMode:UIDocumentPickerModeImport];
  
  importMenu.delegate = self;
  UIViewController *root = [[[[UIApplication sharedApplication] delegate] window] rootViewController];
  [root presentViewController:importMenu animated:YES completion:nil];
}


@end