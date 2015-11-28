//
//  DocPicker.h
//  Grouplus
//
//  Created by krxsky on 2015-11-27.
//  Copyright © 2015 Facebook. All rights reserved.
//

#import "RCTBridgeModule.h"
#import <Foundation/Foundation.h>
@import UIKit;

@interface DocManager : NSObject <RCTBridgeModule, UIDocumentMenuDelegate, UIActionSheetDelegate, UINavigationControllerDelegate>

@end
