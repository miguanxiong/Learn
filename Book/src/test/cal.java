package test;

import java.io.UnsupportedEncodingException;
import java.text.Format;
import java.util.Formatter;
import java.util.Locale;

public class cal {

	public static void main(String[] args) {
String a="1用户.ftl";

//a.substring(1,a.length()-4)
try {
	String b=new String(a.substring(1,a.length()-4).getBytes("UTF-8"),"UTF-8");
	System.out.println(b);
} catch (UnsupportedEncodingException e) {
	// TODO Auto-generated catch block
	e.printStackTrace();
}

	}
public static void testRecursion(int i)
{
//	int i=0;
System.out.println("这是个递归"+i);
      i++;
      if(i>10)
    	  return;
testRecursion(i);
}
	
	

}
