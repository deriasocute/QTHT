namespace QTHT.Charts
{
    public class MorriChartModel
    {
        public IEnumerable<string> categories { get; set; }
        public List<Series> series { get; set; }
        public string text { get; set; }
    }
    public class Series
    {
        public string name { get; set; }
        public IEnumerable<int> data { get; set; }
        public string color { get; set; }

    }
    public class Morri
    {
        public string name { get; set; }
        public int y { get; set; }
        public string color { get; set; }

    }
}
