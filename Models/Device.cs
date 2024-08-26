namespace QTHT.Models
{
    public class Device
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string ESP8266ID { get; set; }
        public bool Status { get; set; } = false;
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime Updated { get; set; } = DateTime.Now;
    }
}
