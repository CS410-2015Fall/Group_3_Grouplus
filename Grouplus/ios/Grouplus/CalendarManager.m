//
//  CalendarManager.m
//  Grouplus
//
//  Created by Daisy Luo on 2015-10-11.
//  Copyright © 2015 Facebook. All rights reserved.
//

#import "CalendarManager.h"
#import "RCTConvert.h"

@implementation CalendarManager
RCT_EXPORT_MODULE()
// (NSString *)ISO8601DateString

RCT_EXPORT_METHOD(addEvent:(NSString *)name location:(NSString *)location date:(NSString *)ISO8601DateString)
{
  NSString *name=[RCTConvert NSString];
  NSString *location=[RCTConvert NSString];
  NSDate *date = [RCTConvert NSDate:ISO8601DateString];
}

@end
