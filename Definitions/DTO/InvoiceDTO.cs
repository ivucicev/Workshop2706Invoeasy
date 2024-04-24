using Invoeasy.Definitions.BM;
using Invoeasy.Definitions.Enum;

namespace Invoeasy.Definitions.DTO
{
    public class InvoiceDTO
    {
        public Guid? Id { get; set; }
        public int Number { get; set; }
        public string? Name { get; set; }

        public Guid InvoiceCustomerId { get; set; }
        public string InvoiceCustomerName { get; set; }
        public string InvoiceCustomerAddress { get; set; }

        public virtual IEnumerable<ItemBM>? Items { get; set; }

        public Status Status { get; set; }

    }
}
