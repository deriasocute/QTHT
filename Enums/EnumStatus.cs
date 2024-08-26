using System.ComponentModel;

namespace QTHT.Enums
{
    public class EnumStatus
    {
        public enum PumpStatus
        {
            [Description("Không hoạt động")]
            NotWork = 0,

            [Description("Đang hoạt động")]
            Working = 1
        }
        public enum WaterLevelStatus
        {
            [Description("Chưa đầy")]
            NotFull = 0,

            [Description("Đầy")]
            Full = 1
        }

        public enum StationStatus
        {
            [Description("Không hoạt động")]
            NotWork = 0,

            [Description("Đang hoạt động")]
            Working = 1,

            [Description("Không xác định")]
            Unknown = 2
        }

        public static Dictionary<int, string> GetDescribes<T>()
        {
            var dict = new Dictionary<int, string>();
            try
            {
                var names = Enum.GetNames(typeof(T));
                foreach (var name in names)
                {
                    dict.Add((int)Enum.Parse(typeof(T), name), GetDescribe<T>(name));
                }
                dict = dict.ToDictionary(m => m.Key, m => m.Value);
            }
            catch
            {
            }
            return dict;
        }
        public static string GetDescribe<T>(object name)
        {
            try
            {
                var type = typeof(T);
                var memInfo = type.GetMember(name.ToString());
                var attributes = memInfo[0].GetCustomAttributes(typeof(DescriptionAttribute), false);
                return ((DescriptionAttribute)attributes[0]).Description;
            }
            catch
            {
                return null;
            }
        }
    }
}
