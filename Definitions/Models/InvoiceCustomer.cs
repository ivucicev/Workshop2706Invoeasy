using System.ComponentModel.DataAnnotations.Schema;

namespace Invoeasy.Definitions.Models
{
    public class InvoiceCustomer : EntityBase
    {
        public Guid CustomerId { get; set; }
        public string? Name { get; set; }
        public string? Address { get; set; }

        [ForeignKey("CustomerId")]
        public virtual Customer Customer { get; set; }

        public virtual Invoice? Invoice { get; set; }
    }
}
