package com.grouplus;

import android.content.Intent;
import android.util.Log;
import android.net.Uri;

import java.util.Map;
import java.util.HashMap;
import java.lang.SecurityException;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class CalendarModule extends ReactContextBaseJavaModule {


    private static final String TEXT_PLAIN = "text/plain";
    private static final String TEXT_HTML = "text/html";

    private ReactApplicationContext reactContext;

    public CalendarModule(ReactApplicationContext reactContext) {
      super(reactContext);
      this.reactContext = reactContext;
    }

    @Override
    public String getName() {
      return "CalendarModule";
    }

    @Override
    public Map<String, Object> getConstants() {
      final Map<String, Object> constants = new HashMap<>();
      constants.put("TEXT_PLAIN", TEXT_PLAIN);
      constants.put("TEXT_HTML", TEXT_HTML);
      return constants;
    }

    private Intent getSendIntent(String text, String type) {
      Intent sendIntent = new Intent();
      sendIntent.setAction(Intent.ACTION_SEND);
      sendIntent.putExtra(Intent.EXTRA_TEXT, text);
      sendIntent.setType(type);
      sendIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

      return sendIntent;
    }
    
    @ReactMethod
    public void addEvent(String title, String location, Integer begin, Integer end) {
            // Intent intent = new Intent(Intent.ACTION_INSERT)
            // .setData(Events.CONTENT_URI)
            // .putExtra(Events.TITLE, title)
            // .putExtra(Events.EVENT_LOCATION, location)
            // .putExtra(CalendarContract.EXTRA_EVENT_BEGIN_TIME, begin)
            // .putExtra(CalendarContract.EXTRA_EVENT_END_TIME, end);  
      Intent intent = new Intent(Intent.ACTION_EDIT);
      intent.setType("vnd.android.cursor.item/event");
      intent.putExtra("title", title);
      intent.putExtra("location", location);
      intent.putExtra("beginTime", begin);
      intent.putExtra("endTime", end);
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

      reactContext.startActivity(intent);
}

}