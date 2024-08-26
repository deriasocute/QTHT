namespace QTHT.Models
{
    public class StatusHistory
    {
        public SensorValue SensorValue { get; set; }
        public List<SensorValue> SensorValues { get; set; }
        public string ESP8266ID { get; set; }
        public DateTime TimestampMessage { get; set; }
    }
     public class SensorReading
    {
        public int SensorID { get; set; }
        public string SensorType { get; set; }
        public int Value { get; set; }
    }
}
