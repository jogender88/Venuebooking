namespace UserInfo
{
    partial class DeviceComunication
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.btnBW = new System.Windows.Forms.Button();
            this.btnIFACE = new System.Windows.Forms.Button();
            this.btnTFT = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // btnBW
            // 
            this.btnBW.BackColor = System.Drawing.SystemColors.Control;
            this.btnBW.Location = new System.Drawing.Point(38, 132);
            this.btnBW.Name = "btnBW";
            this.btnBW.Size = new System.Drawing.Size(90, 25);
            this.btnBW.TabIndex = 0;
            this.btnBW.Text = "BW Device";
            this.btnBW.UseVisualStyleBackColor = false;
            this.btnBW.Click += new System.EventHandler(this.btnBW_Click);
            // 
            // btnIFACE
            // 
            this.btnIFACE.Location = new System.Drawing.Point(260, 132);
            this.btnIFACE.Name = "btnIFACE";
            this.btnIFACE.Size = new System.Drawing.Size(90, 25);
            this.btnIFACE.TabIndex = 2;
            this.btnIFACE.Text = "IFACE Device";
            this.btnIFACE.UseVisualStyleBackColor = true;
            this.btnIFACE.Click += new System.EventHandler(this.btnIFACE_Click);
            // 
            // btnTFT
            // 
            this.btnTFT.Location = new System.Drawing.Point(148, 132);
            this.btnTFT.Name = "btnTFT";
            this.btnTFT.Size = new System.Drawing.Size(90, 25);
            this.btnTFT.TabIndex = 1;
            this.btnTFT.Text = "TFT Device";
            this.btnTFT.UseVisualStyleBackColor = true;
            this.btnTFT.Click += new System.EventHandler(this.btnTFT_Click);
            // 
            // DeviceComunication
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.White;
            this.BackgroundImage = global::UserInfo.Properties.Resources.login_page1;
            this.ClientSize = new System.Drawing.Size(401, 302);
            this.Controls.Add(this.btnIFACE);
            this.Controls.Add(this.btnTFT);
            this.Controls.Add(this.btnBW);
            this.MaximizeBox = false;
            this.Name = "DeviceComunication";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "eSSL";
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Button btnBW;
        private System.Windows.Forms.Button btnIFACE;
        private System.Windows.Forms.Button btnTFT;
    }
}