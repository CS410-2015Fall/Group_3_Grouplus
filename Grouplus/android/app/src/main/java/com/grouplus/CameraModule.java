//package com.grouplus;
//
//import android.content.Intent;
//import android.graphics.Bitmap;
//import android.os.Bundle;
//import android.os.Environment;
//import android.provider.MediaStore;
//import android.util.Log;
//import android.net.Uri;
//
//import java.io.File;
//import java.io.IOException;
//import java.util.Map;
//import java.util.HashMap;
//import java.lang.SecurityException;
//import java.text.SimpleDateFormat;
//import java.util.Calendar;
//import  java.util.Date;
//import java.text.ParseException;
//import java.lang.Long;
//
//
//
//import com.facebook.react.bridge.Callback;
//import com.facebook.react.bridge.NativeModule;
//import com.facebook.react.bridge.ReactApplicationContext;
//import com.facebook.react.bridge.ReactContext;
//import com.facebook.react.bridge.ReactContextBaseJavaModule;
//import com.facebook.react.bridge.ReactMethod;
//
//public class CameraModule extends ReactContextBaseJavaModule {
//
//
//    private static final String TEXT_PLAIN = "text/plain";
//    private static final String TEXT_HTML = "text/html";
//    static final int REQUEST_IMAGE_CAPTURE = 1;
//    String mCurrentPhotoPath;
//    static final int REQUEST_TAKE_PHOTO = 1;
//
//
//
//
//    private ReactApplicationContext reactContext;
//
//    public CameraModule(ReactApplicationContext reactContext) {
//      super(reactContext);
//      this.reactContext = reactContext;
//    }
//
//    @Override
//    public String getName() {
//      return "CameraModule";
//    }
//
//    @Override
//    public Map<String, Object> getConstants() {
//      final Map<String, Object> constants = new HashMap<>();
//      constants.put("TEXT_PLAIN", TEXT_PLAIN);
//      constants.put("TEXT_HTML", TEXT_HTML);
//      return constants;
//    }
//
//    private Intent getSendIntent(String text, String type) {
//      Intent sendIntent = new Intent();
//      sendIntent.setAction(Intent.ACTION_SEND);
//      sendIntent.putExtra(Intent.EXTRA_TEXT, text);
//      sendIntent.setType(type);
//        sendIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
//
//      return sendIntent;
//    }
//
//    @ReactMethod
//    public void addEvent(String title, String location, String begin, String end){
//      Intent intent = new Intent(Intent.ACTION_EDIT);
//      intent.setType("vnd.android.cursor.item/event");
//      intent.putExtra("title", title);
//      intent.putExtra("location", location);
//        intent.putExtra("beginTime", Long.parseLong(begin));
//
//        intent.putExtra("endTime", Long.parseLong(end));
//        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
//      reactContext.startActivity(intent);
//
//    }
//
//    private void dispatchTakePictureIntent() {
//        Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
//        if (takePictureIntent.resolveActivity(getPackageManager()) != null) {
//            startActivityForResult(takePictureIntent, REQUEST_IMAGE_CAPTURE);
//        }
//    }
//
//    @Override
//    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
//        if (requestCode == REQUEST_IMAGE_CAPTURE && resultCode == RESULT_OK) {
//            Bundle extras = data.getExtras();
//            Bitmap imageBitmap = (Bitmap) extras.get("data");
//            mImageView.setImageBitmap(imageBitmap);
//        }
//    }
//
//    private File createImageFile() throws IOException {
//        // Create an image file name
//        String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
//        String imageFileName = "JPEG_" + timeStamp + "_";
//        File storageDir = Environment.getExternalStoragePublicDirectory(
//                Environment.DIRECTORY_PICTURES);
//        File image = File.createTempFile(
//                imageFileName,  /* prefix */
//                ".jpg",         /* suffix */
//                storageDir      /* directory */
//        );
//
//        // Save a file: path for use with ACTION_VIEW intents
//        mCurrentPhotoPath = "file:" + image.getAbsolutePath();
//        return image;
//    }
//
//    private void dispatchTakePictureIntent() {
//        Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
//        // Ensure that there's a camera activity to handle the intent
//        if (takePictureIntent.resolveActivity(getPackageManager()) != null) {
//            // Create the File where the photo should go
//            File photoFile = null;
//            try {
//                photoFile = createImageFile();
//            } catch (IOException ex) {
//                // Error occurred while creating the File
//            }
//            // Continue only if the File was successfully created
//            if (photoFile != null) {
//                takePictureIntent.putExtra(MediaStore.EXTRA_OUTPUT,
//                        Uri.fromFile(photoFile));
//                startActivityForResult(takePictureIntent, REQUEST_TAKE_PHOTO);
//            }
//        }
//    }
//
//}