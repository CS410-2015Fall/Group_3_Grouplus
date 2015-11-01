//
//  MyCalendar.h
//  Grouplus
//
//  Created by Daisy Luo on 2015-10-14.
//  Copyright © 2015 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface MyCalendar : NSObject

+ (void)requestAccess:(void (^)(BOOL granted, NSError *error))success;
+ (BOOL)addEventAt:(NSDate*)eventDate endEventAt:(NSDate*)endDate withTitle:(NSString*)title inLocation:(NSString*)location;

@end
