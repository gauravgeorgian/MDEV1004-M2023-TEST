interface Configuration {
    mongoURI: string;
    port: string;
  }
  
  const config: Configuration = {
    mongoURI: process.env.MONGODB_URI || 'mongodb+srv://Gaurav:HgGiSJ0voqaKhNbc@moviecluster.deilets.mongodb.net/',
    port: process.env.PORT || '3000'
  };
  
  export default config;