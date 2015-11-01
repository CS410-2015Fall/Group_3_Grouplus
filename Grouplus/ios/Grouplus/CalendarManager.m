//
//  CalendarManager.m
//  Grouplus
//
//  Created by Daisy Luo on 2015-10-11.
//  Copyright © 2015 Facebook. All rights reserved.
//

#import "CalendarManager.h"
#import "RCTConvert.h"
#import "MyCalendar.h"

@implementation CalendarManager
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(addEvent:(NSString *)name location:(NSString *)location date:(NSDate *)eventDate date:(NSDate *)endDate)
{

  [MyCalendar requestAccess:^(BOOL granted, NSError *error) {
    if (granted) {
      BOOL result = [MyCalendar addEventAt:eventDate endEventAt:endDate withTitle:name inLocation:location];
      if (result) {
        NSLog(@"Successfully addEvents");
      } else {
        // unable to create event/calendar
      }
    } else {
      // you don’t have permissions to access calendars
    }
  }];
}

@end
