using Invoeasy.DAL.Context;
using Invoeasy.Definitions.BM;
using Invoeasy.Definitions.Models;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Invoeasy.BLL.CQRS.Commands.Invoice
{
    public record SaveInvoiceItemsCommand(Guid InvoiceId, IEnumerable<ItemBM> Items) : IRequest<IEnumerable<ItemBM>>;

    public class SaveInvoiceItemsCommandHandler : IRequestHandler<SaveInvoiceItemsCommand, IEnumerable<ItemBM>>
    {
        private readonly InvoeasyDB ctx;

        public SaveInvoiceItemsCommandHandler(InvoeasyDB ctx)
        {
            this.ctx = ctx;
        }

        public async Task<IEnumerable<ItemBM>> Handle(SaveInvoiceItemsCommand request, CancellationToken cancellationToken)
        {

            var items = await ctx.Item.Where(i => i.InvoiceId == request.InvoiceId && i.Active).ToListAsync();

            items.ForEach(i => i.Active = false);

            items.AddRange(request.Items.Adapt<IEnumerable<Item>>());

            await ctx.SaveChangesAsync();

            return request.Items;

        }
    }
}
