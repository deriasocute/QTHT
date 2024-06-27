using Microsoft.EntityFrameworkCore;

namespace QTHT.Models.Data
{
    public class QTHTDataContext : DbContext
    {
        public QTHTDataContext(DbContextOptions<QTHTDataContext> options) : base(options) { }
        public DbSet<QTHT.Models.User> User { get; set; }
        public DbSet<QTHT.Models.StationConfig> StationConfig { get; set; }
        public DbSet<QTHT.Models.PumpConfig> PumpConfig { get; set; }
        public DbSet<QTHT.Models.WaterLevelConfig> WaterLevelConfig { get; set; }
    }
}
