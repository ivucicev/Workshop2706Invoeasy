using Invoeasy.BLL.CQRS.Commands.Invoice;
using MediatR;

namespace Invoeasy.BLL.CQRS.Events
{
    public record InvoiceCreatedEventNotification(Guid Id) : INotification;

    internal class InvoiceCreatedEventNotificationHandler : INotificationHandler<InvoiceCreatedEventNotification>
    {
        private readonly IMediator mediator;

        public InvoiceCreatedEventNotificationHandler(IMediator mediator)
        {
            this.mediator = mediator;
        }

        public async Task Handle(InvoiceCreatedEventNotification request, CancellationToken cancellationToken)
        {
            await mediator.Send(new UpdateInvoiceStatusCommand(request.Id));
        }

    }
}
