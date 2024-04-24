using Invoeasy.BLL.CQRS.Commands.Invoice;
using Invoeasy.Definitions.BM;
using MediatR;

namespace Invoeasy.BLL.CQRS.Events
{
    public record InvoiceUpdatedEventNotification(Guid Id, IEnumerable<ItemBM> Items) : INotification;

    public class InvoiceUpdatedEventNotificationHandler : INotificationHandler<InvoiceUpdatedEventNotification>
    {
        private readonly IMediator mediator;

        public InvoiceUpdatedEventNotificationHandler(IMediator mediator)
        {
            this.mediator = mediator;
        }

        public async Task Handle(InvoiceUpdatedEventNotification request, CancellationToken cancellationToken)
        {
            // gen pdf
            await mediator.Send(new SaveInvoiceItemsCommand(request.Id, request.Items));
        }
    }
}
