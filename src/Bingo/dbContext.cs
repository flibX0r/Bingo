using Bingo.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bingo
{
    public class dbContext : DbContext
    {
        public dbContext(DbContextOptions<dbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Phrase>()
                .HasKey(p => p.id);

            modelBuilder.Entity<Phrase>()
                .Property(p => p.id)
                .UseSqlServerIdentityColumn()
                .IsRequired();

            modelBuilder.Entity<Phrase>()
                .Property(p => p.phrase)
                .IsRequired()
                .HasMaxLength(64);
        }

        public DbSet<Phrase> Phrases { get; set; }
    }
}
