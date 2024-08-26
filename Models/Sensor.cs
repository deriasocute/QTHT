namespace QTHT.Models
{
    public class Sensor
    {
        public int ID { get; set; }
        public int DeviceID { get; set; }
        public string SensorType { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime Updated { get; set; } = DateTime.Now;
    }
}
