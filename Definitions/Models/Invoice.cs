using System.ComponentModel.DataAnnotations.Schema;
using Invoeasy.Definitions.Enum;

namespace Invoeasy.Definitions.Models
{
    public class Invoice : EntityBase
    {
        public int Number { get; set; }
        public string? Name { get; set; }

        public Guid InvoiceCustomerId { get; set; }

        [ForeignKey("InvoiceCustomerId")]
        public virtual InvoiceCustomer? InvoiceCustomer { get; set; }

        public virtual ICollection<Item>? Items { get; set; }

        public Status Status { get; set; }

    }
}
