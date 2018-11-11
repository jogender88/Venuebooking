using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Windows.Forms;

namespace UserInfo
{
    public partial class DeviceComunication : Form
    {
        public DeviceComunication()
        {
            InitializeComponent();
        }

        private void btnBW_Click(object sender, EventArgs e)
        {
            DialogResult dialogresult = MessageBox.Show("Are you Connecting Black and White Device ?", "Confirmation", MessageBoxButtons.YesNo, MessageBoxIcon.Question);
                if(dialogresult ==DialogResult.Yes)
                {
                    UserInfoMainBW obj = new UserInfoMainBW();
                    obj.ShowDialog();
                    this.Close();
                }
                else
                {
                    return;
                }
        }

        private void btnTFT_Click(object sender, EventArgs e)
        {

            DialogResult dialogresult = MessageBox.Show("Are you connecting TFT Device?", "Confirmation", MessageBoxButtons.YesNo, MessageBoxIcon.Question);
            if (dialogresult == DialogResult.Yes)
            {
                UserInfoMainTFT obj = new UserInfoMainTFT();
                obj.ShowDialog();
                this.Close();
            }
            else
            {
                return;
            }
        }

        private void btnIFACE_Click(object sender, EventArgs e)
        {
            DialogResult dialogresult = MessageBox.Show("Are you connecting  IFace Device?", "Confirmation", MessageBoxButtons.YesNo, MessageBoxIcon.Question);
            if (dialogresult == DialogResult.Yes)
            {
                UserInfoMainIFACE obj = new UserInfoMainIFACE();
                obj.ShowDialog();
                this.Close();
            }
            else
            {
                return;
            }
        }
    }
}
