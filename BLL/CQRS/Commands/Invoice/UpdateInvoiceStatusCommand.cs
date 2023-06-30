using Invoeasy.DAL.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Invoeasy.BLL.CQRS.Commands.Invoice
{
    public record UpdateInvoiceStatusCommand(Guid Id) : IRequest;

    internal class UpdateInvoiceStatusCommandHandler : IRequestHandler<UpdateInvoiceStatusCommand>
    {
        private readonly InvoeasyDB ctx;

        public UpdateInvoiceStatusCommandHandler(InvoeasyDB ctx)
        {
            this.ctx = ctx;
        }

        public async Task Handle(UpdateInvoiceStatusCommand request, CancellationToken cancellationToken)
        {
            var invoice = await ctx.Invoice.FirstOrDefaultAsync(i => i.Id == request.Id);

            await Task.Delay(5000);

            invoice.Status = Definitions.Enum.Status.PROCESSING;

            await ctx.SaveChangesAsync();
        }
    }
}
