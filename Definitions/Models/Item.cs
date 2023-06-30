using System.ComponentModel.DataAnnotations.Schema;

namespace Invoeasy.Definitions.Models
{
    public class Item : EntityBase
    {
        public string? Name { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public Guid InvoiceId { get; set; }

        [ForeignKey("InvoiceId")]
        public Invoice? Invoice { get; set; }
    }
}
