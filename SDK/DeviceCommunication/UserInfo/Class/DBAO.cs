using System;
using System.Collections.Generic;
using System.Text;
using System.Data.OleDb;

namespace UserInfo
{
    class DBAO
    {
        public OleDbConnection asconn;
       
        public void Connect()
        {
            try
            {
                string startupPath = System.IO.Directory.GetCurrentDirectory();
                string Database = Environment.CurrentDirectory;
                asconn = new OleDbConnection("Provider=Microsoft.Jet.OLEDB.4.0;Data Source=UserInfoDB.mdb");
               // asconn = new OleDbConnection("Provider=Microsoft.Jet.OLEDB.4.0;Data Source=D:\\sdk\\32bit\\20111113_564\\Communication Protocol SDK(32Bit Ver6.2.4.0)\\Demo\\C#\\TFT\\UserInfo\\bin\\Debug\\UserInfoDB.mdb");
                asconn.Open();
               
               }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        public void DisConnect()
        {
            try
            {
                asconn.Close();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
