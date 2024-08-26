namespace QTHT.Models.View
{
    public class SensorMessage
    {
        public string ESP8266ID { get; set; }
        public DateTime TimestampMessage { get; set; }
        public List<SensorValue> SensorValues { get; set; }
    }
}
