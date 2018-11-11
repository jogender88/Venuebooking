using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using System.Data.OleDb;

namespace UserInfo
{
    class UICO:DBAO
    {
        OleDbCommand ascmd;
        DataTable dt;
        OleDbDataAdapter da;

        // for black and white device
        public void Insert_User_DetailsBK(string UserId, string Name, int fingerIndex, string fingerImage, int privilege, string pass, bool enabled, int flag)
        {
            try
            {
                Connect();
                //string CheckVal = "SELECT count(*) FROM  BWDevice where User_Id = @UserId";
                //ascmd = new OleDbCommand(CheckVal, asconn);
                //OleDbParameter p = new OleDbParameter("@User_Id", UserId);
                //ascmd.Parameters.Add(p);
                //count = Convert.ToInt32(ascmd.ExecuteScalar());

                    string query = "INSERT INTO [BWDevice](User_Id,Name,Finger_Index,Finger_Image,Privilege,Passwords,Enabled,Flag) VALUES(@userId,@name,@fingerIndex,@fingerImage,@privilege,@password,@enabled,@flag)";
                    ascmd = new OleDbCommand(query, asconn);

                    OleDbParameter p1 = new OleDbParameter("@userId", UserId);
                    OleDbParameter p2 = new OleDbParameter("@name", Name);
                    OleDbParameter p3 = new OleDbParameter("@fingerIndex", fingerIndex);
                    OleDbParameter p4 = new OleDbParameter("@fingerImage", fingerImage);
                    OleDbParameter p5 = new OleDbParameter("@privilege", privilege);
                    OleDbParameter p6 = new OleDbParameter("@password", pass);
                    OleDbParameter p7 = new OleDbParameter("@enabled", enabled);
                    OleDbParameter p8 = new OleDbParameter("@flag", flag);

                    ascmd.Parameters.Add(p1);
                    ascmd.Parameters.Add(p2);
                    ascmd.Parameters.Add(p3);
                    ascmd.Parameters.Add(p4);
                    ascmd.Parameters.Add(p5);
                    ascmd.Parameters.Add(p6);
                    ascmd.Parameters.Add(p7);
                    ascmd.Parameters.Add(p8);

                    ascmd.ExecuteNonQuery();

                                
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                DisConnect();
            }

        }
        public DataTable UploadDataBK()
        {

            try
            {
                dt = new DataTable();
                Connect();

                string upload_data = "SELECT * FROM  BWDevice";
                ascmd = new OleDbCommand(upload_data, asconn);

                da = new OleDbDataAdapter(ascmd);
                da.Fill(dt);

            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                DisConnect();
            }
            return dt;

        }           
        public void DeleteAllEmpTmBK()
        {
            try
            {
                Connect();
                string CheckValPersonId = "Delete from BWDevice ";
                ascmd = new OleDbCommand(CheckValPersonId, asconn);
                ascmd.ExecuteNonQuery();


            }
            catch (Exception ee)
            {
                // throw ee;
            }
            finally
            {
                DisConnect();
            }
        }

         // for TFT Device
        public void Insert_User_DetailsTFT(string UserId, string Name, int fingerIndex, string fingerImage, int privilege, string pass , bool enabled, int flag)
        {
            try
            {
                Connect();
              
                string query = "INSERT INTO [TFTDevice](User_Id,Name,Finger_Index,Finger_Image,Privilege,Passwords,Enabled,Flag) VALUES(@userId,@name,@fingerIndex,@fingerImage,@privilege,@password,@enabled,@flag)";   
                ascmd = new OleDbCommand(query, asconn);
                
                    OleDbParameter p1 = new OleDbParameter("@userId", UserId);
                    OleDbParameter p2 = new OleDbParameter("@name", Name);
                    OleDbParameter p3 = new OleDbParameter("@fingerIndex", fingerIndex);
                    OleDbParameter p4 = new OleDbParameter("@fingerImage", fingerImage);
                    OleDbParameter p5 = new OleDbParameter("@privilege", privilege);
                    OleDbParameter p6 = new OleDbParameter("@password", pass);
                    OleDbParameter p7 = new OleDbParameter("@enabled", enabled);
                    OleDbParameter p8 = new OleDbParameter("@flag", flag);

                    ascmd.Parameters.Add(p1);
                    ascmd.Parameters.Add(p2);
                    ascmd.Parameters.Add(p3);
                    ascmd.Parameters.Add(p4);
                    ascmd.Parameters.Add(p5);
                    ascmd.Parameters.Add(p6);
                    ascmd.Parameters.Add(p7);
                    ascmd.Parameters.Add(p8);
                  
                    ascmd.ExecuteNonQuery();

            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                DisConnect();
            }

        }
        public DataTable UploadDataTFT()
        {

            try
            {
                dt = new DataTable();
                Connect();

                string upload_data = "SELECT * FROM  TFTDevice";
                ascmd = new OleDbCommand(upload_data, asconn);

                da = new OleDbDataAdapter(ascmd);
                da.Fill(dt);

            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                DisConnect();
            }
            return dt;

        }
        public void DeleteAllEmpTmTFT()
        {
            try
            {
                Connect();
                string CheckValPersonId = "Delete from TFTDevice ";
                ascmd = new OleDbCommand(CheckValPersonId, asconn);
                ascmd.ExecuteNonQuery();


            }
            catch (Exception ee)
            {
                // throw ee;
            }
            finally
            {
                DisConnect();
            }
        }
       
        // for IFACE Finger templates
        public void Insert_User_DetailsIFACE_FingerTm(string UserId, string Name, int fingerIndex, string fingerImage, int privilege, string pass, bool enabled, int flag)
        {
          
            try
            {
                Connect();
                string query = "INSERT INTO [IFACEDevice_FingerTm](User_Id,Name,Finger_Index,Finger_Image,Privilege,Passwords,Enabled,Flag) VALUES(@userId,@name,@fingerIndex,@fingerImage,@privilege,@password,@enabled,@flag)";
                    ascmd = new OleDbCommand(query, asconn);

                    OleDbParameter p1 = new OleDbParameter("@userId", UserId);
                    OleDbParameter p2 = new OleDbParameter("@name", Name);
                    OleDbParameter p3 = new OleDbParameter("@fingerIndex", fingerIndex);
                    OleDbParameter p4 = new OleDbParameter("@fingerImage", fingerImage);
                    OleDbParameter p5 = new OleDbParameter("@privilege", privilege);
                    OleDbParameter p6 = new OleDbParameter("@password", pass);
                    OleDbParameter p7 = new OleDbParameter("@enabled", enabled);
                    OleDbParameter p8 = new OleDbParameter("@flag", flag);

                    ascmd.Parameters.Add(p1);
                    ascmd.Parameters.Add(p2);
                    ascmd.Parameters.Add(p3);
                    ascmd.Parameters.Add(p4);
                    ascmd.Parameters.Add(p5);
                    ascmd.Parameters.Add(p6);
                    ascmd.Parameters.Add(p7);
                    ascmd.Parameters.Add(p8);

                    ascmd.ExecuteNonQuery();

            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                DisConnect();
            }

        }
        public DataTable UploadDataIFACE_FingerTm()
        {

            try
            {
                dt = new DataTable();
                Connect();

                string upload_data = "SELECT * FROM  IFACEDevice_FingerTm";
                ascmd = new OleDbCommand(upload_data, asconn);

                da = new OleDbDataAdapter(ascmd);
                da.Fill(dt);

            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                DisConnect();
            }
            return dt;

        }
        public void DeleteAllEmpTmIFACE_FingerTm()
        {
            try
            {
                Connect();
                string CheckValPersonId = "Delete from IFACEDevice_FingerTm ";
                ascmd = new OleDbCommand(CheckValPersonId, asconn);
                ascmd.ExecuteNonQuery();


            }
            catch (Exception ee)
            {
                // throw ee;
            }
            finally
            {
                DisConnect();
            }
        }

        // for IFACE Face templates
        public void Insert_User_DetailsIFACE_FaceTm(string UserId, string Name, string pass,int privilege, int faceIndex, string faceImage,int faceLength,bool enabled)
        {

            try
            {
                Connect();
                string query = "INSERT INTO [IFACEDevice_FaceTm](User_Id,Name,Passwords,Privilege,Face_Index,Face_Image,Face_Length,Enabled) VALUES(@userId,@name,@password,@privilege,@faceIndex,@faceImage,@faceLength,@enabled)";
                ascmd = new OleDbCommand(query, asconn);

                OleDbParameter p1 = new OleDbParameter("@userId", UserId);
                OleDbParameter p2 = new OleDbParameter("@name", Name);
                OleDbParameter p3 = new OleDbParameter("@password", pass);
                OleDbParameter p4 = new OleDbParameter("@privilege", privilege);
                OleDbParameter p5 = new OleDbParameter("@faceIndex", faceIndex);
                OleDbParameter p6 = new OleDbParameter("@faceImage", faceImage);
                OleDbParameter p7 = new OleDbParameter("@faceLength", faceLength);
                OleDbParameter p8 = new OleDbParameter("@enabled", enabled);               

                ascmd.Parameters.Add(p1);
                ascmd.Parameters.Add(p2);
                ascmd.Parameters.Add(p3);
                ascmd.Parameters.Add(p4);
                ascmd.Parameters.Add(p5);
                ascmd.Parameters.Add(p6);
                ascmd.Parameters.Add(p7);
                ascmd.Parameters.Add(p8);

                ascmd.ExecuteNonQuery();

            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                DisConnect();
            }

        }
        public DataTable UploadDataIFACE_FaceTm()
        {

            try
            {
                dt = new DataTable();
                Connect();

                string upload_data = "SELECT * FROM  IFACEDevice_FaceTm";
                ascmd = new OleDbCommand(upload_data, asconn);

                da = new OleDbDataAdapter(ascmd);
                da.Fill(dt);

            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                DisConnect();
            }
            return dt;

        }
        public void DeleteAllEmpTmIFACE_FaceTm()
        {
            try
            {
                Connect();
                string CheckValPersonId = "Delete from IFACEDevice_FaceTm ";
                ascmd = new OleDbCommand(CheckValPersonId, asconn);
                ascmd.ExecuteNonQuery();


            }
            catch (Exception ee)
            {
                // throw ee;
            }
            finally
            {
                DisConnect();
            }
        }
    }
}
