using Invoeasy.Definitions.Models;
using Microsoft.EntityFrameworkCore;

namespace Invoeasy.DAL.Context
{
    public class InvoeasyDB : DbContext
    {
        private IConfiguration config;

        public InvoeasyDB(IConfiguration config)
        {
            this.config = config;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(config.GetConnectionString("DefaultConnection"));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Invoice>()
                .ToTable("Invoice", "Invoice");

            modelBuilder.Entity<InvoiceCustomer>()
                .ToTable("InvoiceCustomer", "Invoice");

            modelBuilder.Entity<Item>()
                .ToTable("Item", "Invoice");

            modelBuilder.Entity<Customer>()
                .ToTable("Customer", "Customer");


        }

        #region PreSave Modifiers

        private void PreSaveModifiers()
        {
            var entities = ChangeTracker.Entries().Where(x => x.Entity is EntityBase && (x.State == EntityState.Added || x.State == EntityState.Modified));

            foreach (var entity in entities)
            {
                if (entity.State == EntityState.Added)
                {
                    ((EntityBase)entity.Entity).CreatedAt = DateTime.UtcNow;
                    ((EntityBase)entity.Entity).Active = true;
                }
                ((EntityBase)entity.Entity).ModifiedAt = DateTime.UtcNow;
                ((EntityBase)entity.Entity).ReadAt = DateTime.UtcNow;
            }
        }

        #endregion

        #region Save changes
        public override int SaveChanges(bool addTimestamps = true)
        {
            if (addTimestamps)
                PreSaveModifiers();
            return base.SaveChanges();
        }

        public async Task<int> SaveChangesAsync(bool addTimestamps = true)
        {
            if (addTimestamps)
                PreSaveModifiers();
            return await base.SaveChangesAsync();
        }

        #endregion

        #region Models

        public virtual DbSet<Invoice> Invoice { get; set; }
        public virtual DbSet<Item> Item { get; set; }
        public virtual DbSet<Customer> Customer { get; set; }
        public virtual DbSet<InvoiceCustomer> InvoiceCustomer { get; set; }


        #endregion

    }
}
