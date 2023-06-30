using Invoeasy.DAL.Context;
using Invoeasy.Definitions.DTO;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Invoeasy.BLL.CQRS.Queries.Invoice
{
    public record GetInvoiceByIdQuery(Guid Id) : IRequest<InvoiceDTO>;

    internal class GetInvoiceByIdQueryHandler : IRequestHandler<GetInvoiceByIdQuery, InvoiceDTO>
    {
        private readonly InvoeasyDB ctx;

        public GetInvoiceByIdQueryHandler(InvoeasyDB ctx)
        {
            this.ctx = ctx;
        }

        public async Task<InvoiceDTO> Handle(GetInvoiceByIdQuery request, CancellationToken cancellationToken)
        {
            return await ctx.Invoice
                .ProjectToType<InvoiceDTO>()
                .FirstOrDefaultAsync(i => i.Id == request.Id);

        }
    }
}
