using Invoeasy.Definitions.DTO;
using MediatR;

namespace Invoeasy.BLL.CQRS.Queries.Invoice
{
    public record GetAllInvoicesQuery() : IRequest<IEnumerable<InvoiceDTO>>;

    internal class GetAllInvoicesQueryHandler : IRequestHandler<GetAllInvoicesQuery, IEnumerable<InvoiceDTO>>
    {
        public GetAllInvoicesQueryHandler()
        {
        }

        public async Task<IEnumerable<InvoiceDTO>> Handle(GetAllInvoicesQuery request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
