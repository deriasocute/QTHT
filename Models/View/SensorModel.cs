namespace QTHT.Models.View
{
    public class SensorModel
    {
        public int DeviceID { get; set; }
        public string SensorType { get; set; }
        public List<Sensor> Sensors { get; set; }
        public Sensor Sensor { get; set; }
    }
}
