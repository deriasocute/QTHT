namespace QTHT.Models
{
    public class SensorValue
    {
        public int ID { get; set; }
        public int SensorID { get; set; }
        public string ESP8266ID { get; set; }
        public double Value { get; set; }
        public DateTime TimestampMessage { get; set; }

    }
}
