const hebrewRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length == 0 || pageSize == 0) {
    return `0 מ ${length}`;
  }
  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  // If the start index exceeds the list length, do not try and fix the end index to the end.
  const endIndex =
    startIndex < length
      ? Math.min(startIndex + pageSize, length)
      : startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} מ ${length}`;
};

function getHebrewPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();
  paginatorIntl.itemsPerPageLabel = 'הזמנות לעמוד:';
  paginatorIntl.nextPageLabel = 'עמוד הבא';
  paginatorIntl.previousPageLabel = 'עמוד קודם';
  paginatorIntl.getRangeLabel = hebrewRangeLabel;

  return paginatorIntl;
}

import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import {
  DxHtmlEditorModule,
  DxTagBoxModule,
  DxPieChartModule,
  DxPopupModule,
  DxScrollViewModule,
  DxTemplateModule,
} from 'devextreme-angular';
import { MatBadgeModule } from '@angular/material/badge';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';
import {
  MatLegacyPaginatorModule as MatPaginatorModule,
  MatLegacyPaginatorIntl as MatPaginatorIntl,
} from '@angular/material/legacy-paginator';
@NgModule({
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatInputModule,
    MatProgressBarModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatBadgeModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatRadioModule,
    DxHtmlEditorModule,
    DxTagBoxModule,
    DxPieChartModule,
    DxPopupModule,
    DxScrollViewModule,
    DxTemplateModule,
  ],
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatInputModule,
    MatProgressBarModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    DxHtmlEditorModule,
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getHebrewPaginatorIntl() },
  ],
})
export class MaterialModule {}
